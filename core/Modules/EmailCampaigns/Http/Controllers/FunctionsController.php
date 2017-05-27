<?php

namespace Modules\EmailCampaigns\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use \Platform\Controllers\Core;
use Modules\EmailCampaigns\Http\Models;
use DeviceDetector\DeviceDetector;
use DeviceDetector\Parser\Device\DeviceParserAbstract;

class FunctionsController extends Controller
{
  /**
   * Get all form categories
   */
  public static function getCategories()
  {
    $items = [];

    $items[] = [
      "icon" => 'heartenvelope.svg',
      "category" => "transactional_email",
      "name" => trans('emailcampaigns::global.transactional_email'),
      "desc" => trans('emailcampaigns::global.transactional_email_desc')
    ];

    $items[] = [
      "icon" => 'letter.svg',
      "category" => "marketing_email",
      "name" => trans('emailcampaigns::global.marketing_email'),
      "desc" => trans('emailcampaigns::global.marketing_email_desc')
    ];

    $items[] = [
      "icon" => 'calendar.svg',
      "category" => "drip_campaign",
      "name" => trans('emailcampaigns::global.drip_campaign'),
      "desc" => trans('emailcampaigns::global.drip_campaign_desc')
    ];

    return $items;
  }

  /**
   * Get all form templates from a category
   */
  public static function getTemplatesByCategory($category)
  {
    $category_templates = [];

    $templates = array_sort(\File::directories(base_path('../templates/emails/')), function($dir) {
      if (\File::exists($dir . '/config.php')) {
        $config = include $dir . '/config.php';
        return $config['created_at'];
      } else {
        return $dir;
      }
    });

    foreach ($templates as $template) {
      if (\File::exists($template . '/config.php') && \File::exists($template . '/index.blade.php')) {
        $config = include $template . '/config.php';

        if ($config['active'] && in_array($category, $config['categories'])) {

          $dir = basename($template);

          // Create thumbnail for preview if not exists
          $preview01_path = base_path('../templates/emails/' . $dir . '/preview-01.png');
          $preview01_thumb = 'emails/template/' . $dir . '/preview/01-600.jpg';

          $exists = Storage::disk('public')->exists($preview01_thumb);

          if (! $exists) {
            $img = \Image::make($preview01_path);

            $img->resize(600, null, function ($constraint) {
              $constraint->aspectRatio();
            });

            $img_string = $img->encode('jpg', 60);

            Storage::disk('public')->put($preview01_thumb, $img_string->__toString());
            $preview01_url = Storage::disk('public')->url($preview01_thumb);
          } else {
            $preview01_url = Storage::disk('public')->url($preview01_thumb);
          }

          $category_templates[] = [
            'dir' => $dir,
            'created_at' => $config['created_at'],
            'updated_at' => $config['updated_at'],
            'preview01' => $preview01_url
          ];

        }
      }
    }

    return $category_templates;
  }

  /**
   * Create a email campaign
   */
  public static function createCampaign($template, $name, $user_id = null, $funnel_id = null)
  {
    if ($user_id == null) $user_id = Core\Secure::userId();
    if ($funnel_id == null) $funnel_id = Core\Secure::funnelId();

    $name = substr($name, 0, 200);
    $template_path = base_path('../templates/emails/');

    if (\File::exists($template_path . $template . '/config.php') && \File::exists($template_path . $template . '/index.blade.php')) {
      $config = include $template_path . $template . '/config.php';

      // First create campaign
      $email_campaign = new Models\EmailCampaign;

      $email_campaign->user_id = $user_id;
      $email_campaign->funnel_id = $funnel_id;
      $email_campaign->name = $name;
      $email_campaign->language = auth()->user()->language;
      $email_campaign->timezone = auth()->user()->timezone;
      $email_campaign->save();

      $email_campaign_id = $email_campaign->id;

      // Then, create (first) email for campaign
      $email = new Models\Email;

      $email->user_id = $user_id;
      $email->email_campaign_id = $email_campaign_id;
      $email->name = $name;
      $email->template = $template;
      $email->save();

      $local_domain = Core\Secure::staticHash($email->id, true);

      $email->local_domain = $local_domain;
      $email->save();

      // Finally, create directory with files
      $storage_root = 'emails/email/' . Core\Secure::staticHash($user_id) . '/' . $local_domain;

      // Get template HTML and replace title
      $html = view('template.emails::' . $template . '.index');

      // Suppress libxml errors
      // Resolves an issue with some servers.
      libxml_use_internal_errors(true);

      // Create a new PHPQuery object to manipulate
      // the DOM in a similar way as jQuery.
      $html = \phpQuery::newDocumentHTML($html);
      \phpQuery::selectDocument($html);

      // Update page
      pq('title')->text($name);
      pq('head')->find('title')->after('<meta name="description" content="">');

      //$html = str_replace('</section><section', "</section>\n\n<section", $html);
      //$html = str_replace(url('/'), '', $html);

      // Beautify html
      $html = Core\Parser::beautifyHtml($html);

      $variant = 1;

      $storage_root_full = $storage_root . '/' . Core\Secure::staticHash($email->id, true) . '/' . $variant;

      \Storage::disk('public')->makeDirectory($storage_root_full . '/' . date('Y-m-d-H-i-s'));
      \Storage::disk('public')->put($storage_root_full . '/' . date('Y-m-d-H-i-s') . '/index.blade.php', $html);
      \Storage::disk('public')->put($storage_root_full . '/index.blade.php', $html);

      return $email;
    } else {
      return false;
    }
  }
}
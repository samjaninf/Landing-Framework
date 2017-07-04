<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use \Platform\Controllers\Core;

class MemberResetPassword extends Notification
{
    use Queueable;

    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /**
     * Security link with item id.
     *
     * @var string
     */
    public $sl;

    /**
     * Create a notification instance.
     *
     * @param  string  $token
     * @return void
     */
    public function __construct($token, $sl)
    {
        $this->token = $token;
        $this->sl = $sl;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
      $reset_link = url('member/password/reset', $this->token) . '?sl=' . $this->sl;

      return (new MailMessage)
                  ->subject(trans('global.reset_password_subject', ['product_name' => Core\Reseller::get()->name]))
                  ->greeting(trans('global.mail_greeting', ['name' => $notifiable->name]))
                  ->line(trans('global.reset_password_mail_line1'))
                  ->action(trans('global.reset_password'), $reset_link)
                  ->line(trans('global.mail_closing', ['product_name' => Core\Reseller::get()->name]));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}

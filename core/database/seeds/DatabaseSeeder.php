<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('resellers')->insert([
            'api_token' => str_random(60),
            'name' => 'Landing Framework',
            'support_email' => 'support@example.com',
            'domain' => '*',
            'active' => true,
            'logo' => '/assets/branding/icon-light.svg',
            'logo_square' => '/assets/branding/square.svg',
            'favicon' => '/assets/branding/favicon.ico',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        DB::table('plans')->insert([
            'order' => 1,
            'reseller_id' => 1,
            'name' => 'full_access',
            'price1' => 0,
            'price1_string' => '0',
            'active' => false,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        DB::table('plans')->insert([
            'order' => 2,
            'reseller_id' => 1,
            'name' => 'Starter',
            'price1' => 0,
            'price1_string' => 'FREE',
            'active' => true,
            'default' => true,
            'limitations' => '{
              "forms": {"max": "2", "visible": "1", "edit_html": "1", "max_entries": "2"}, 
              "media": {"visible": "0"}, "account": {"plan_visible": "1"}, 
              "eddystones": {"max": "1", "visible": "1"}, 
              "landingpages": {"max": "2", "visible": "1", "edit_html": "1", "custom_domain": "1"}, 
              "emailcampaigns": {"max": "2", "visible": "1"}
            }',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        DB::table('users')->insert([
            'is_reseller_id' => 1,
            'reseller_id' => 1,
            'plan_id' => 1,
            'name' => 'System Owner',
            'email' => 'info@example.com',
            'password' => bcrypt('welcome'),
            'api_token' => str_random(60),
            'confirmed' => 1,
            'role' => 'owner',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }
}

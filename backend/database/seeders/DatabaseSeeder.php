<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach ([
            'Author',
            'Editor',
            'Subscriber',
            'Administrator',
        ] as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        $samples = [
            [
                'email' => 'alice.author@example.com',
                'full_name' => 'Alice Author',
                'roles' => ['Author'],
            ],
            [
                'email' => 'ed.editor@example.com',
                'full_name' => 'Ed Editor',
                'roles' => ['Editor'],
            ],
            [
                'email' => 'sam.subscriber@example.com',
                'full_name' => 'Sam Subscriber',
                'roles' => ['Subscriber'],
            ],
            [
                'email' => 'amy.admin@example.com',
                'full_name' => 'Amy Administrator',
                'roles' => ['Administrator'],
            ],
            [
                'email' => 'pat.publisher@example.com',
                'full_name' => 'Pat Publisher',
                'roles' => ['Author', 'Editor'],
            ],
            [
                'email' => 'maria.manager@example.com',
                'full_name' => 'Maria Manager',
                'roles' => ['Editor', 'Administrator'],
            ],
        ];

        foreach ($samples as $data) {
            $user = User::firstOrCreate([
                'email' => $data['email'],
            ], [
                'full_name' => $data['full_name'],
            ]);

            $roleIds = Role::whereIn('name', $data['roles'])->pluck('id')->all();
            $user->roles()->sync($roleIds);
        }
    }
}
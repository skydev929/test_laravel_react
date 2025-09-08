<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    // GET /api/users?role=Administrator
    public function index(Request $request)
    {
        $roleName = $request->query('role');

        $query = User::with('roles');
        if ($roleName) {
            $query->whereHas('roles', function ($q) use ($roleName) {
                $q->where('name', $roleName);
            });
        }

        return response()->json($query->get());
    }

    // POST /api/users
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'full_name' => 'required|string|max:255',
            'roles' => 'required|array|min:1',
            'roles.*' => [
                'string',
                Rule::in(['Author', 'Editor', 'Subscriber', 'Administrator']),
            ],
        ]);

        $user = User::create([
            'email' => $validated['email'],
            'full_name' => $validated['full_name'],
        ]);

        $roleIds = Role::whereIn('name', $validated['roles'])->pluck('id')->all();
        $user->roles()->sync($roleIds);

        return response()->json([
            'message' => 'User created successfully.',
            'data' => $user->load('roles'),
        ], 201);
    }
}

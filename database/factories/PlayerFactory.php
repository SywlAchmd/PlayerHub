<?php

namespace Database\Factories;

use App\Models\Player;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Player>
 */
class PlayerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Player::class;
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'club' => $this->faker->company(),
            'position' => $this->faker->randomElement(['GK', 'CB', 'RB', 'LB', 'DMF', 'CMF', 'RMF', 'LMF', 'CF']),
            'stat' => $this->faker->numberBetween(0, 100),
        ];
    }
}

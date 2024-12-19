<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Player::query();
        if($request->has('search') && $request->search != '') {
            $query->where('name', 'like', '%'.$request->search.'%')
            ->orWhere('club', 'like', '%'.$request->search.'%')
            ->orWhere('position', 'like', '%'.$request->search.'%')
            ->orWhere('stat', 'like', '%'.$request->search.'%');
        }

        $query = $query->orderBy('stat', 'desc');

        $player = $query->paginate(10);

        return Inertia::render('Player/Index', [
            'players' => $player,
            'filters' => $request->only(['search'])
        ]);
    }

    public function formAdd()
    {
        return Inertia::render('Player/FormAdd');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tname' => 'required',
            'tclub' => 'required',
            'tposition' => 'required',
            'tstat' => 'required'
        ], [], [
            'tname' => 'Name',
            'tclub' => 'Club',
            'tposition' => 'Position',
            'tstat' => 'Stat'
        ]);

        $player = new Player();

        $player->name = $validated['tname'];
        $player->club = $validated['tclub'];
        $player->position = $validated['tposition'];
        $player->stat = $validated['tstat'];
        $player->save();

        return redirect()->route('player.index')->with('message', 'Player added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $player = Player::find($id);
        if(!$player) {
            return redirect()->route('player.index')->with('error', 'Player not found');
        }

        return Inertia::render('Player/FormEdit', [
            'id' => $id,
            'player' => $player
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'tname' => 'required',
            'tclub' => 'required',
            'tposition' => 'required',
            'tstat' => 'required'
        ], [], [
            'tname' => 'Name',
            'tclub' => 'Club',
            'tposition' => 'Position',
            'tstat' => 'Stat'
        ]);

        $player = Player::find($id);

        $player->name = $validated['tname'];
        $player->club = $validated['tclub'];
        $player->position = $validated['tposition'];
        $player->stat = $validated['tstat'];
        $player->save();

        return redirect()->route('player.index')->with('message', "Data Player '". $player->name ."' updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $player = Player::findOrFail($id);
        $name = $player->name;
        $player->delete();

        return redirect()->route("player.index")->with("message", "Player '" . $name . "' deleted successfully");
    }
}

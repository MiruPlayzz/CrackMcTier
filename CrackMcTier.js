import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

const gamemodes = ["Vanilla", "Pot", "Sword", "Axe", "Mace", "Neth", "OPS", "MPS", "UHC"];

export default function CrackMcTier() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/players.json")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const filtered = players.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white p-6">
      <header className="text-center text-5xl font-bold mb-8">CrackMcTier</header>
      <Tabs defaultValue="Vanilla" className="max-w-6xl mx-auto mb-8">
        <TabsList className="flex flex-wrap justify-center gap-2 bg-zinc-800 rounded-xl p-2">
          {gamemodes.map((g) => (
            <TabsTrigger key={g} value={g} className="capitalize px-4 py-2 bg-zinc-700 text-white hover:bg-white hover:text-black">
              {g}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <Input placeholder="Search player..." onChange={(e) => setSearch(e.target.value)} className="w-full md:w-1/3" />
          <div className="flex gap-2">
            <Button onClick={() => alert('/set tier command run')}>/set tier</Button>
            <Button onClick={() => alert('/player skin command run')}>/player skin</Button>
            <Button onClick={() => alert('/set scoreboard command run')}>/set scoreboard</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <Card key={p.name} className="bg-zinc-800 text-white shadow-lg rounded-xl">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="text-2xl font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-400">{p.region}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{p.tier}</div>
                  <div className="text-sm">{p.points} pts</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

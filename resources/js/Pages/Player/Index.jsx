import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

export default function Index({ players, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");

    const editData = (id) => {
        Inertia.get(`/player/${id}`);
    };

    const deleteData = (id, name) => {
        if (
            confirm(
                `Apakah Anda yakin akan menghapus player dengan nama '${name}'?`
            )
        ) {
            Inertia.delete(`/player/${id}`);
        }
    };

    const searchData = (e) => {
        e.preventDefault();

        Inertia.get("/player", { search }, { preserveState: true });
    };

    const startNumber = (players.current_page - 1) * players.per_page;

    console.log(players);

    return (
        <div className="p-6">
            <h3 className="font-bold text-3xl">Player Stats</h3>
            <hr className="my-2" />

            <section className="flex items-center justify-between gap-4 flex-row-reverse">
                <form onSubmit={searchData} className="flex gap-2 items-center">
                    <div className="flex justify-center h-fit items-center gap-2 border-2 rounded-full border-gray-300 p-2">
                        <IoIosSearch className="size-6 text-gray-400" />
                        <div>
                            <input
                                type="text"
                                value={search}
                                placeholder="Search..."
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-transparent outline-none border-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="text-black my-3 inline-block bg-gray-200 px-4 py-2 rounded-md"
                    >
                        Search
                    </button>
                </form>

                <Link
                    as="button"
                    type="button"
                    href="/player/add"
                    className="text-white my-3 bg-blue-400 px-4 py-2 rounded-md flex items-center justify-center gap-2"
                >
                    <FaPlus />
                    Add Player
                </Link>
            </section>

            {flash && flash.message && (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
                    role="alert"
                >
                    <strong className="font-bold">Success! </strong>
                    <span className="block sm:inline">{flash.message}</span>
                </div>
            )}

            <table className="border-collapse border border-black mt-4 w-full">
                <thead>
                    <tr className="bg-blue-300">
                        <th className="border border-black px-4 py-2">Rank</th>
                        <th className="border border-black px-4 py-2">
                            Player
                        </th>
                        <th className="border border-black px-4 py-2">Club</th>
                        <th className="border border-black px-4 py-2">
                            Position
                        </th>
                        <th className="border border-black px-4 py-2">Stat</th>
                        <th className="border border-black px-4 py-2">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {players.data && players.data.length === 0 ? (
                        <tr>
                            <td
                                className="border border-black px-4 py-2 text-center"
                                colSpan={5}
                            >
                                Data Kosong...
                            </td>
                        </tr>
                    ) : (
                        players.data.map((player, index) => (
                            <tr key={player.id} className="bg-gray-100">
                                <td className="border border-black px-4 py-2 text-center">
                                    {startNumber + index + 1}
                                </td>
                                <td className="border border-black px-4 py-2">
                                    {player.name}
                                </td>
                                <td className="border border-black px-4 py-2">
                                    {player.club}
                                </td>
                                <td className="border border-black px-4 py-2">
                                    {player.position}
                                </td>
                                <td className="border border-black px-4 py-2">
                                    {player.stat}
                                </td>
                                <td className="border border-black px-4 py-2">
                                    <div className="flex justify-center gap-4">
                                        <button
                                            className="inline-block bg-blue-400 text-white px-4 py-2 rounded-md"
                                            onClick={() => editData(player.id)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="inline-block bg-red-400 text-white px-4 py-2 rounded-md"
                                            onClick={() =>
                                                deleteData(
                                                    player.id,
                                                    player.name
                                                )
                                            }
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <section className="mt-5">
                <div className="flex gap-2">
                    {players.links.map((link, index) => {
                        let isActive = link.active;
                        let linkLabel = link.label;

                        const linkActive = isActive ? "bg-gray-300" : "";

                        console.log(linkLabel);

                        if (linkLabel.includes("laquo")) {
                            linkLabel = "<< Previous";
                        } else if (linkLabel.includes("raquo")) {
                            linkLabel = "Next >>";
                        }

                        const isDisabled = !link.url;

                        const buttonClass = `border border-black p-2 rounded-md ${linkActive} ${
                            isDisabled ? "bg-gray-200 text-gray-400" : ""
                        }`;

                        return (
                            <button
                                key={index}
                                onClick={() =>
                                    link.url && Inertia.get(link.url)
                                }
                                className={buttonClass}
                                disabled={isDisabled}
                            >
                                {linkLabel}
                            </button>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

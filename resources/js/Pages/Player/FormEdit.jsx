import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { IoMdClose } from "react-icons/io";

export default function FormEdit({ id, player }) {
    const [tname, setTname] = useState(player.name);
    const [tclub, setTclub] = useState(player.club);
    const [tposition, setTposition] = useState(player.position);
    const [tstat, setTstat] = useState(player.stat);

    const [loading, setLoading] = useState(false);

    // Mendapatkan errors dari props
    const { errors } = usePage().props;

    // Daftar opsi posisi
    const positionOptions = [
        {
            value: "GK",
            label: "Goalkeeper - Kiper yang bertugas mengamankan gawang dari gol lawan",
        },
        {
            value: "CB",
            label: "Centre Back - Bek Tengah, posisinya dibelakang bagian tengah atau depan kiper untuk menghalau serangan musuh yang datang dari tengah",
        },
        {
            value: "RB",
            label: "Right Back - Bek Kanan, posisinya sebelah kanan dari Bek Tengah",
        },
        {
            value: "LB",
            label: "Left Back - Bek Kiri, posisinya sebelah kiri dari Bek Tengah",
        },
        {
            value: "DMF",
            label: "Defensive Midfielder - Gelandang Bertahan, posisi mainnya ditengah tapi agak kebelakang, juga sewaktu-waktu membantu Bek jika dibutuhkan",
        },
        {
            value: "CMF",
            label: "Center Midfielder - Gelandang Serang, posisinya berada ditengah agak kedepan, membantu serangan",
        },
        {
            value: "RMF",
            label: "Right Midfielder - Sayap Kanan, membuat umpan / crossing untuk Striker",
        },
        {
            value: "LMF",
            label: "Left Midfielder - Sayap Kiri, posisi berada di sisi kiri depan, tugasnya sama dengan RMF",
        },
        {
            value: "CF",
            label: "Centre Forward - Striker, ujung tombak pencetak gol",
        },
    ];

    // Handler perubahan select position
    const handlePositionChange = (e) => {
        setTposition(e.target.value);
    };

    // Handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Form submitted:", { tname, tclub, tposition, tstat });

        const player = { tname, tclub, tposition, tstat };

        Inertia.put(`/player/${id}`, player, {
            onFinish: () => {
                setLoading(false);
            },
        });

        // Mengosongkan input setelah submit
        // setTname("");
        // setTclub("");
        // setTposition("");
        // setTstat("");
    };

    return (
        <div className="p-10">
            <section className="flex items-center justify-between">
                <h1 className="font-semibold">Form Edit Player</h1>

                <Link
                    as="button"
                    type="button"
                    href="/player"
                    className="text-black my-3 inline-block bg-gray-200 px-4 py-2 rounded-md"
                >
                    <IoMdClose className="text-xl" />
                </Link>
            </section>

            <hr />

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Nama Player
                    </label>
                    <input
                        type="text"
                        value={tname}
                        onChange={(e) => setTname(e.target.value)}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            errors.tname ? "border-red-500" : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />

                    {errors.tname && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.tname}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Club
                    </label>
                    <input
                        type="text"
                        value={tclub}
                        onChange={(e) => setTclub(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    {errors.tclub && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.tclub}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Position
                    </label>
                    <select
                        value={tposition}
                        onChange={handlePositionChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                            errors.tposition
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    >
                        <option value="">Pilih posisi...</option>
                        {positionOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                defaultValue={tposition === option.value}
                            >
                                {option.value} - {option.label}
                            </option>
                        ))}
                    </select>

                    {errors.tposition && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.tposition}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Stat
                    </label>
                    <input
                        type="number"
                        value={tstat}
                        onChange={(e) => setTstat(e.target.value)}
                        min={0}
                        max={100}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    {errors.tstat && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.tstat}
                        </p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-block px-4 py-2 text-white bg-green-400 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-1/12"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
}

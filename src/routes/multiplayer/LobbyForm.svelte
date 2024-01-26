<!--
// v0 by Vercel.
// https://v0.dev/t/1Sj1DliUkuo
-->

<div class="mt-auto p-4">
    <div class="rounded-lg border border-gray-500 text-card-foreground shadow-sm" data-v0-t="card">
        <div class="p-6 flex flex-row space-y-0 items-start gap-2">
            <div class="grid gap-1"><h3
                    class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Add Room</h3>
                <p class="text-sm text-muted-foreground">Enter the details of the new room.</p></div>
        </div>
        <div class="p-6">
            <form class="w-full justify-center">
                <div class="flex flex-row gap-4">
                    <div class="w-[40%]">
                        <div class="grid gap-2"><label
                                class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                                for="room-name">
                            Room Name
                        </label><input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="room-name" placeholder="Room Name" type="text"></div>
                    </div>
                    <div class="w-full grid gap-4 md:gap-6">
                        <div class="grid gap-2"><label
                                class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                                for="room-name">
                            Room Name
                        </label><input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="room-name" placeholder="Room Name" type="text"></div>
                        <div class="grid gap-2"><label
                                class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
                                for="capacity">
                            Capacity
                        </label><input
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="capacity" placeholder="Capacity" type="number"></div>

                    </div>
                </div>

                <button class="w-full mt-6 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border border-gray-500 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8">
                    Add Room
                </button>
            </form>

        </div>
    </div>
</div>

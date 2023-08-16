/*
  * How to use:
  * Each line is a track song. its composed by a format of
  * <track name> | <duration>
  * where duration uses a space character instead of a ":"
  * to separate order units.
  *
  * ex:
  * Input: Perfume | 3 20
  * Output: { name: "perfume", duration: "3:20" }
*/

import fs from "fs/promises";

const input = process.argv[2];

if(!input) {
  throw new Error(`input is not defined.`)
}

// Just throw this. If the file doesn't exist,
// process will stop. (i hope)
fs.stat(input)

async function parseTracklist() {
  const output = [];
  const content = await fs.readFile(input, { encoding: "utf-8" });
  const lines = content.split("\n");

  lines.forEach((line) => {
    const trimmed = line.trim();
    if(trimmed == "") return;

    const [songName, rawDuration] = trimmed.split(" | ");
    output.push({
      name: songName,
      duration: rawDuration.replaceAll(" ", ":")
    })
  })

  console.log(output)
}

parseTracklist()

const stackInputString = Deno.readTextFileSync(
  "/Users/eberechiruche/Downloads/adventofcode.com_2022_day_5_input.txt"
)
  .split("\n\n")
  .filter((line) => line !== "")[0];

const rearrangementSteps = Deno.readTextFileSync(
  "/Users/eberechiruche/Downloads/adventofcode.com_2022_day_5_input.txt"
)
  .split("\n\n")
  .filter((line) => line !== "")[1]
  .split("\n")
  .filter((line) => line !== "");

const stackInputStringArray = stackInputString.split("\n");
const stack = {};

function populateStack(value: string) {
  let sliceIndex = 0;
  for (let i = 1; i <= Math.round(value.length / 4); i++) {
    if (stack[i]) {
      if (value.slice(sliceIndex, sliceIndex + 4).includes("[")) {
        stack[i] = [value.slice(sliceIndex, sliceIndex + 4), ...stack[i]];
      }
    } else {
      if (value.slice(sliceIndex, sliceIndex + 4).includes("[")) {
        stack[i] = [value.slice(sliceIndex, sliceIndex + 4)];
      }
    }

    sliceIndex += 4;
  }
}
stackInputStringArray.forEach((item) => {
  populateStack(item);
});

function compile() {
  rearrangementSteps.forEach((instruction) => {
    let parseInstruction = instruction.split(" ");

    execute(parseInstruction);
  });
}

function execute(instruction: string[]) {
  let qty = instruction[1];
  let location = instruction[3];
  let destination = instruction[5];

  let crates = stack[location].splice(-Number(qty));

  stack[destination] = [...stack[destination], ...crates.reverse()];
}

function getCreate() {
  const crates: string[] = [];
  for (let i = 1; i < stackInputStringArray.length + 1; i++) {
    let stackLocation = i.toString();
    let lastItem = stack[stackLocation].slice(-1);
    crates.push(lastItem[0]);
  }
  console.log(crates);
}
compile();

getCreate();

interface MultiplyValues {
  value1: number;
  value2: number;
}

// value checking, and throw error when its not fit
const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided Value is not a number");
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(value1, value2);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Error : ", error.message);
  } else {
    console.log("Something went wrong");
  }
}

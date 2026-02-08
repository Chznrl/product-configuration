import ora from "ora";
import { execSync } from "node:child_process";

function run(step, command) {
    const spinner = ora(step).start();
    try {
        execSync(command, { stdio: "ignore" });
        spinner.succeed(`${step} ✔`);
    } catch (e) {
        spinner.fail(`${step} ✖`);
        console.error(e.message);
        process.exit(1);
    }
}

console.log("\n🚀 Starting full project build\n");

run("Installing dependencies", "npm install");
run("Generating OpenAPI types", "npm run generate:api");
run("Running lint checks", "npm run lint");
run("Building application", "npm run build");

console.log("\n✅ All steps finished successfully\n");

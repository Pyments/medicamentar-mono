ORIGINAL_DIR=$(pwd)

run_command() {
    local dir="$1"
    local cmd="$2"
    (
        cd "$dir" || { echo "Failed to change to directory: $dir"; return 1; }
        echo "Running command in $(pwd): $cmd"
        eval "$cmd"
    ) &
}

echo "Starting Medicamentar Desktop..."
run_command "$ORIGINAL_DIR/apps/medicamentar-desktop" "pnpm run dev"

echo "Starting Medicamentar API..."
run_command "$ORIGINAL_DIR/apps/medicamentar-api" "pnpm run dev"

cleanup() {
    echo "Stopping all processes..."
    pkill -f "pnpm run dev"
    pkill -f "mvnw spring-boot:run"
}

trap cleanup EXIT

echo "Both processes are now running. Press Ctrl+C to stop."

while true; do
    sleep 1
done
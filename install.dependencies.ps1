# Array of service directories
$services = @(
  "./microservices/user-service",
  "./microservices/client-service",
  "./microservices/delivery-service",
  "./microservices/restaurant-service",
  "./microservices/commercial-service",
  "./microservices/technical-service",
  "./microservices/sales-service"
)

# Loop through each service directory
foreach ($service in $services) {
  Write-Host "Setting up $service"
  
  # Copy the package.json.template to the service's backend directory as package.json
  Write-Host "Copying package.json.template to $service/backend/package.json"
  Copy-Item -Path "package.json.template" -Destination "$service/backend/package.json" -Force

  # Verify if the package.json was copied correctly
  if (Test-Path "$service/backend/package.json") {
    Write-Host "Successfully copied package.json to $service/backend"
  } else {
    Write-Host "Failed to copy package.json to $service/backend"
    continue
  }

  # Change directory to the service's backend directory
  Write-Host "Changing directory to $service/backend"
  Set-Location -Path "$service/backend"

  # Install dependencies
  Write-Host "Running npm install in $service/backend"
  npm install

  # Change directory back to the root of the project
  Write-Host "Changing directory back to the root of the project"
  Set-Location -Path "../../.."
}
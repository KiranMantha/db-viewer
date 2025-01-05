# DB Viewer

This Visual Studio Code extension provides a sidebar interface to interact with and visualize SQLite databases. With this extension, you can easily open `.db` / `.sqlite` files, view the tables within the database, and inspect the columns of each table.

## Features

- **Open SQLite Databases**: Select and open `.db` / `.sqlite` files from your file system.
- **Table View**: View a list of all tables in the selected database.
- **Column View**: Explore the columns in each table with a tree structure highlighting promary and foreign keys with color coded tags.
- **Table data**: Click on any table to view the records in it.
- **Button to view ER Diagram**: Trigger logic to view ER Diagram.
- **Button to download ER Diagram as svg**: Trigger logic to download ER Diagram as svg

## Requirements

- Visual Studio Code (VSCode)
- SQLite database files (`*.db` / `*.sqlite`)

## Installation

To install this extension locally:

1. Download or clone this repository.
2. Run `npm install` to install all the packages.
3. Run `npm run build` to generate the extension package.
4. Open VSCode and navigate to the Extensions view.
5. Click on the `...` menu at the top of the Extensions view and select **Install from VSIX...**.
6. Choose the `.vsix` file created from `build` step to install it.

## Usage

1. After installation, navigate to file explorer
2. Click on any sqlite database with extensions (`.db` / `.sqlite`). This will open a new window where you can view:
   - Tables
   - Columns under each table. Primary keys are tagged with yellow color and Foreign keys are tagged with blue color.
3. Click on any table to view all the records in it. you can edit the table data and save as well.
4. Click on View ER Diagram button to view entity relations between each table. click on download button to download the same as svg.

## Known Issues

- Currently, this extension only supports SQLite databases with `.db` / `.sqlite` file extensions.
- Some large databases might take a longer time to load, depending on the system performance.

## Contributing

Feel free to fork the repository and submit issues or pull requests. Contributions are always welcome!

## License

This extension is licensed under the MIT License. See the LICENSE file for more details.

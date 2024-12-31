# DB Viewer

This Visual Studio Code extension provides a sidebar interface to interact with and visualize SQLite databases. With this extension, you can easily open `.db` files, view the tables within the database, and inspect the columns of each table.

## Features

- **Open SQLite Databases**: Select and open `.db` files from your file system.
- **Table View**: View a list of all tables in the selected database.
- **Column View**: Explore the columns in each table with a tree structure.
- **Button for Database Processing**: Trigger custom processing for the selected database with a button.

## Requirements

- Visual Studio Code (VSCode)
- SQLite database files (`.db`)

## Installation

To install this extension locally:

1. Download or clone this repository.
2. Open VSCode and navigate to the Extensions view.
3. Click on the `...` menu at the top of the Extensions view and select **Install from VSIX...**.
4. Choose the `.vsix` file created from this extension to install it.

## Usage

1. After installation, you'll see a new icon in the **Activity Bar** on the left side of VSCode.
2. Click the extension icon to open the sidebar.
3. Use the **"Open SQLite Database"** button to select a `.db` file.
4. Once the database is loaded, you can see the list of tables and explore each table's columns.
5. If you wish, you can use the **"Process Database"** button to trigger additional database processing.

## Known Issues

- Currently, this extension only supports SQLite databases with `.db` file extensions.
- Some large databases might take a longer time to load, depending on the system performance.

## Contributing

Feel free to fork the repository and submit issues or pull requests. Contributions are always welcome!

## License

This extension is licensed under the MIT License. See the LICENSE file for more details.


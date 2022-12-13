# Zinven
## Overview
Zinven enables Inventory Manager publication of available assets for other Inventory Managers and Customers, authenticated or not. This affords Customers visibility on currently available assets so they may establish contact with an asset's Inventory Manager to acquire or inquire about them.
## Table of Contents
- [Running](#running)
  * [Locally](#locally)
  * [Online](#online)
- [ERD](#erd)
- [User Stories](#user-stories)
## Running
### Locally
  Requires Docker, also requires patience
```bash
git clone git@github.com:awcl/Zinven.git
cd Zinven
cd ui && npm i && cd ../api && npm i
docker compose up
```
* [Frontend Default](http://localhost:3000/)
* [Backend Default](https://localhost:8080/)
### Online
The production application is hosted by [render](https://render.com/)
## ERD
![ERD](ERD.png?raw=true)
## User Stories
1. As an ***inventory manager*** I want to be able to create an account so that I can track my inventory.
    - The user credentials must be salted and hashed before being stored.
2. As an ***inventory manager*** I want to be able to log into my account so that I can see my inventory of items.
    - After logging in, the inventory manager should be redirected to their inventory of items.
3. As an ***inventory manager*** I want to be able to create a new item so that I can share my item details with the world.
    - After the item is created, the inventory manager should be redirected to their inventory of items.
    - An item displays name, description, and quantity.
4. As an ***inventory manager*** I want to be able to see my entire inventory of items.
    - The inventory of items should display the first 100 characters of each item description, with “...” at the end if the description is longer than 100 characters.
5. As an ***inventory manager*** I want to be able to see any individual item I have added.
    - The full item information should be displayed.
6. As an ***inventory manager*** I want to be able to edit an item so that I can fix any mistakes I made creating it.
    - When the user toggles edit mode, the page remains the same and the fields become editable.
7. As an ***inventory manager*** I want to be able to delete an item so that I can remove any unwanted content.
When the user deletes the item they should be redirected to their inventory of items.
8. As a ***visitor***, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item.
    - Unauthenticated users should be able to view all items, and any single item.
    - The items should only display the first 100 characters of its description with “...” at the end if it is longer than 100 characters.
9. As a ***visitor***, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details.
   - Unauthenticated users should be able to view all items, and any single item.
10. As an ***inventory manager*** I want to be able to view all items created by every inventory manager so that I can browse every item.
    - Unauthenticated users should be able to view all items, and any single item.

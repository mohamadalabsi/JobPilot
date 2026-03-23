// so here when a user is created, we will create a default board for them
import connectDB from "./db";
import { Board, Column } from "./models";

// this about this as jpa in java where u have methods from the repo we can use in the service layer 

const DEFAULT_COLUMNS = [
  {
    name: "Wish List",
    order: 0,
  },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

export async function initializeUserBoard(userId: string) {
  try {
    // fist connect to the database and create the models and populate thge one we need to create the default board for the user
    await connectDB();

    // now interacting with the models we created and with our tables 
    // Check if board already exists
    const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });

    if (existingBoard) {
      return existingBoard;
    }

    // Create the board
    const board = await Board.create({
      name: "Job Hunt",
      userId,
      columns: [], //first empty columns we will fill it in the next step
    });

    // Create default columns
    // promise here means we are waiting for all the columns to be created before we move on to the next step
    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({
          name: col.name,
          order: col.order,
          boardId: board._id,
          jobApplication: [],
        })
      )
    );

    // Update the board with the new column IDs
    board.columns = columns.map((col) => col._id);
    await board.save();

    return board;
  } catch (err) {
    throw err;
  }
}
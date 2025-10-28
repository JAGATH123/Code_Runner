import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/code-runner';
const MONGODB_DB = process.env.MONGODB_DB || 'code-runner';

async function updateSession5() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(MONGODB_DB);
    const sessionsCollection = db.collection('sessions');

    // Update Session 5 with Conditional Statements content
    const session5Update = {
      session_id: 5,
      level_id: 1,
      session_number: 5,
      title: 'Understanding if, if-else Statements and Comparison Operators',
      description: 'Learn how conditional statements let your program make decisions. Master if and if-else statements to check conditions and control program flow using comparison operators like ==, !=, <, >, <=, and >=.',
      introduction_content: `1. if statement.png
➡️ Used to execute a block of code only if a specified condition is true.

🖼️ 2. if-else statement.png
➡️ Executes one block of code if the condition is true, and another block if it's false.

🖼️ 3. elif.png
➡️ Allows checking multiple conditions sequentially after the initial if statement.

🖼️ 4. nested elif.png
➡️ An if statement inside another if statement to test multiple levels of conditions.

🖼️ 5. comparison operator.jpg
➡️ Used to compare two values and return either True or False based on the condition.`,
      problem_ids: [21, 22, 23, 24, 25],
      metadata: {
        estimated_time_hours: 3,
        prerequisites: [4]
      },
      updated_at: new Date()
    };

    const result = await sessionsCollection.updateOne(
      { session_id: 5 },
      { $set: session5Update }
    );

    console.log('Session 5 updated:', result.modifiedCount > 0 ? 'Success' : 'No changes needed');

    console.log('\n✅ Session 5 training protocol updated successfully!');
    console.log('Title:', session5Update.title);
    console.log('Description:', session5Update.description);

  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the update function
updateSession5()
  .then(() => {
    console.log('\n🚀 Session update completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Session update failed:', error);
    process.exit(1);
  });

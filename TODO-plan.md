## MY PLAN FOR THE TODO APP ##

1. TODO app should allow users to create a task!
    *   Task to get stored in db.
    *   Browser will refresh with updated 'tasks'
        *   Tasks will have a delete and update buttons. 
        *   When task is updated (background will change accordingly 'CSS')


Database:
tasks table will have the following columns:
id: integer primary key
text: varchar
isComplete: boolean
// a task object should look something like:
{
  id: 1,
  text: 'take out the trash',
  isComplete: false
}
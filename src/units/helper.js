const { sequelize } = require('../infra/database/db_connection'); // Import sequelize directly

const runInTransaction = async (callback, _transaction) => {
  const ownTransaction = !_transaction;
  const transaction = ownTransaction
    ? await sequelize.transaction()  
    : _transaction;

  try {
    // Ensure callback is called with the transaction
    const result = await callback(transaction);

    if (ownTransaction) {
      await transaction.commit();
    }
    return result;
  } catch (error) {
    if (ownTransaction && transaction) {
      try {
        await transaction.rollback(); // Attempt rollback if transaction was created
      } catch (rollbackError) {
        throw new Error(rollbackError); // Log rollback error if any
      }
    }
    throw new Error(
      error.stack ? error.stack : error.message ? error.message : error
    );
  } finally {
    if (ownTransaction) {
      // Ensure proper cleanup if needed
      await transaction.cleanup && transaction.cleanup();
    }
  }
};

module.exports = runInTransaction;
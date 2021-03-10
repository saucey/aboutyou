export class ReservationStoreIdConflictError extends Error {
  constructor(conflictingStoreId: number, expectedStoreId: number) {
    super(`Conflict - items storeId: ${conflictingStoreId} is different than expected storeId: ${expectedStoreId}`);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

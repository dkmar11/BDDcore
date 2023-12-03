/**
 * class workspaceEntity to save workspace properties
 */
class ListEntity {
  /**
      * @param {Obj} fields - a object to get a workspace
      */
  createDeafult(fields) {
    this.id = fields.id ?? ''
    this.name = fields.name ?? 'Test_list'
  }
}
    
module.exports = new ListEntity({});
  
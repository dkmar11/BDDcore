/**
 * class SpaceEntity to save space properties
 */
class SpaceEntity {
  /**
   * @param {Object} fields - an object to get space fields
   */
  constructor(fields) {
    this.id = fields.id || '';
    this.name = fields.name || 'Test Space';
    this.multiple_assignees = fields.multiple_assignees || true;
    this.features = {
      due_dates: {
        enabled: fields.features?.due_dates?.enabled || true,
        start_date: fields.features?.due_dates?.start_date || true,
        remap_due_dates: fields.features?.due_dates?.remap_due_dates || true,
        remap_closed_due_date: fields.features?.due_dates?.remap_closed_due_date || false,
      },
      sprints: {
        enabled: fields.features?.sprints?.enabled || false,
      },
      points: {
        enabled: fields.features?.points?.enabled || false,
      },
      custom_items: {
        enabled: fields.features?.custom_items?.enabled || false,
      },
      checklists: {
        enabled: fields.features?.checklists?.enabled || true,
      },
      zoom: {
        enabled: fields.features?.zoom?.enabled || false,
      },
      milestones: {
        enabled: fields.features?.milestones?.enabled || false,
      },
      remap_dependencies: {
        enabled: fields.features?.remap_dependencies?.enabled || true,
      },
      dependency_warning: {
        enabled: fields.features?.dependency_warning?.enabled || true,
      },
      status_pies: {
        enabled: fields.features?.status_pies?.enabled || true,
      },
      emails: {
        enabled: fields.features?.emails?.enabled || true,
      },
    };
  }
}

module.exports = SpaceEntity;


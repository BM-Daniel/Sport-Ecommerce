namespace Ordering.Core.Common
{
    public class BaseEntity
    {
        // can be created in the derived class
        public int Id { get; protected set; }
        // would be created in the parent class - here
        public string? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }
    }
}

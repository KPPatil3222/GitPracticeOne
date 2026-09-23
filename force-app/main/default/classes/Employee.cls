public class Employee {

    private Decimal salary;

    public Decimal setSalary {
        get {
            return salary;
            system.debug('here we calling salary function');
        }

        set {
            if (value >= 0) {
                salary = value;
            }
        }
    }
}
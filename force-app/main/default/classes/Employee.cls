public class Employee {

    private Decimal salary;

    public Decimal setSalary {
        get {
            return salary;
        }

        set {
            if (value >= 0) {
                salary = value;
            }
        }
    }
}
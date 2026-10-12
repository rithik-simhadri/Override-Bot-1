#include "main.h"
#include "pros/motors.hpp"
#include "pros/adi.hpp"
#include "pros/misc.hpp"
#include "pros/rtos.hpp"

namespace {
// V5 smart ports 1-6. The middle motor on each side is reversed to keep
// all three wheels on that side driving in the same direction.
pros::Motor leftFront(1, pros::E_MOTOR_GEARSET_06, false);
pros::Motor leftMiddle(2, pros::E_MOTOR_GEARSET_06, true);
pros::Motor leftRear(3, pros::E_MOTOR_GEARSET_06, false);
pros::Motor rightFront(4, pros::E_MOTOR_GEARSET_06, true);
pros::Motor rightMiddle(5, pros::E_MOTOR_GEARSET_06, false);
pros::Motor rightRear(6, pros::E_MOTOR_GEARSET_06, true);
pros::Motor_Group leftDrive({leftFront, leftMiddle, leftRear});
pros::Motor_Group rightDrive({rightFront, rightMiddle, rightRear});
pros::Controller controller(pros::E_CONTROLLER_MASTER);

// Three-wire ADI outputs 1 and 2 are represented as ports 1 and 2 in PROS.
// Use a suitable solenoid driver/interface; do not connect a coil directly.
pros::ADIDigitalOut pistonOne('A', false);
pros::ADIDigitalOut pistonTwo('B', false);

void setPiston(pros::ADIDigitalOut& piston, pros::controller_digital_e_t extend,
               pros::controller_digital_e_t retract) {
  const bool extendPressed = controller.get_digital(extend);
  const bool retractPressed = controller.get_digital(retract);
  if (extendPressed != retractPressed) {
    piston.set_value(extendPressed);
  }
}
}  // namespace

void initialize() {
  leftDrive.set_brake_mode(pros::E_MOTOR_BRAKE_BRAKE);
  rightDrive.set_brake_mode(pros::E_MOTOR_BRAKE_BRAKE);
}

void autonomous() {
  // Safe starter: no autonomous movement until a routine is configured.
}

void opcontrol() {
  while (true) {
    // Tank drive: left and right stick Y independently control each side.
    leftDrive.move(controller.get_analog(pros::E_CONTROLLER_ANALOG_LEFT_Y));
    rightDrive.move(controller.get_analog(pros::E_CONTROLLER_ANALOG_RIGHT_Y));

    // Each piston is independently latched by its dedicated button pair.
    setPiston(pistonOne, pros::E_CONTROLLER_DIGITAL_L1,
              pros::E_CONTROLLER_DIGITAL_L2);
    setPiston(pistonTwo, pros::E_CONTROLLER_DIGITAL_R1,
              pros::E_CONTROLLER_DIGITAL_R2);
    pros::delay(20);
  }
}

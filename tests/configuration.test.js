const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

const source = fs.readFileSync('src/main.cpp', 'utf8');
const header = fs.readFileSync('include/main.h', 'utf8');
const readme = fs.readFileSync('README.md', 'utf8');

test('six blue-cartridge motors occupy smart ports 1 through 6', () => {
  const motors = [...source.matchAll(/pros::Motor\s+(\w+)\((\d+),\s*pros::E_MOTOR_GEARSET_06,\s*(true|false)\)/g)];
  assert.equal(motors.length, 6);
  assert.deepEqual(motors.map((motor) => Number(motor[2])), [1, 2, 3, 4, 5, 6]);
  assert.match(source, /pros::Motor_Group leftDrive\(\{leftFront, leftMiddle, leftRear\}\)/);
  assert.match(source, /pros::Motor_Group rightDrive\(\{rightFront, rightMiddle, rightRear\}\)/);
});

test('master controller analog sticks drive independent sides', () => {
  assert.match(source, /pros::Controller controller\(pros::E_CONTROLLER_MASTER\)/);
  assert.match(source, /leftDrive\.move\(controller\.get_analog\(pros::E_CONTROLLER_ANALOG_LEFT_Y\)\)/);
  assert.match(source, /rightDrive\.move\(controller\.get_analog\(pros::E_CONTROLLER_ANALOG_RIGHT_Y\)\)/);
  assert.match(source, /leftDrive\.set_brake_mode\(pros::E_MOTOR_BRAKE_BRAKE\)/);
  assert.match(source, /rightDrive\.set_brake_mode\(pros::E_MOTOR_BRAKE_BRAKE\)/);
});

test('two ADI outputs independently latch opposing button commands', () => {
  assert.match(source, /pros::ADIDigitalOut pistonOne\('A', false\)/);
  assert.match(source, /pros::ADIDigitalOut pistonTwo\('B', false\)/);
  assert.match(source, /setPiston\(pistonOne, pros::E_CONTROLLER_DIGITAL_L1,\s*pros::E_CONTROLLER_DIGITAL_L2\)/);
  assert.match(source, /setPiston\(pistonTwo, pros::E_CONTROLLER_DIGITAL_R1,\s*pros::E_CONTROLLER_DIGITAL_R2\)/);
  assert.match(source, /if \(extendPressed != retractPressed\)\s*\{\s*piston\.set_value\(extendPressed\);/);
});

test('PROS task entry points and hardware safety instructions are documented', () => {
  assert.match(header, /void autonomous\(void\)/);
  assert.match(header, /void opcontrol\(void\)/);
  assert.match(source, /void initialize\(\)/);
  assert.match(readme, /600 RPM blue cartridge/);
  assert.match(readme, /ADI A\/B are three-wire outputs on the V5 brain, not Smart Ports 7\/8/);
  assert.match(readme, /not bare solenoid coils directly/);
  assert.match(readme, /L1` extends, `L2` retracts/);
  assert.match(readme, /R1` extends, `R2` retracts/);
});

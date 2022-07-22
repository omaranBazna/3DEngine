///the function to calculate the cross product

function crossProduct(vect_A, vect_B) {
  let result = [];
  result[0] = vect_A[1] * vect_B[2] - vect_A[2] * vect_B[1];
  result[1] = vect_A[2] * vect_B[0] - vect_A[0] * vect_B[2];
  result[2] = vect_A[0] * vect_B[1] - vect_A[1] * vect_B[0];
  return result;
}

///define class for point3D in the 3D space
class Point3D {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
///define class for point2D on the virtual camera

class Point2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//define class for the virtual camera
//the camera face the virtual x-axis in the virtual space
///the camera rotate around the z-axis alpha angle
///the camera make an angle beta with the x-y plan

class Camera {
  constructor(alpha, beta) {
    this.alpha = alpha;
    this.beta = beta;
  }

  rotate(alpha, beta) {
    this.alpha = alpha;
    this.beta = beta;
  }

  project(Point3D) {
    const x = Point3D.x;
    const y = Point3D.y;
    const z = Point3D.z;

    ///define the x,y,z vector of the camera direction toward the center of the virtual world
    let nx, ny, nz, n;
    nx = Math.cos(this.alpha) * Math.cos(this.beta);
    ny = Math.sin(this.alpha) * Math.cos(this.beta);
    nz = Math.sin(this.beta);
    n = Math.sqrt(nx * nx + ny * ny + nz * nz);
    nx = nx / n;
    ny = ny / n;
    nz = nz / n;
    n = [nx, ny, nz];

    let camera_x_axis = [Math.sin(this.alpha), Math.cos(this.alpha), 0];

    ///camera y axis is the cross product of x_axis and camera direction toward the center
    let camera_y_axis = crossProduct(n, camera_x_axis);

    let point = new Point2D(
      camera_x_axis[0] * x + camera_x_axis[1] * y + camera_x_axis[2] * z,
      camera_y_axis[0] * x + camera_y_axis[1] * y + camera_y_axis[2] * z
    );

    return point;
  }
}
///we need to add canvas object
let camera = new Camera(0, 0);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let xo = 300;
let yo = 300;
ctx.fillStyle = "rgb(255,255,255)";
ctx.fillRect(0, 0, 600, 600);

let xAxis = new Point3D(100, 0, 0);
let x_axis = camera.project(xAxis);
ctx.strokeStyle = "#FF0000";
ctx.moveTo(xo, yo);
ctx.lineTo(xo + x_axis.x * 1, yo + x_axis.y * 1);
ctx.stroke();

let yAxis = new Point3D(0, 100, 0);
let y_axis = camera.project(yAxis);
ctx.strokeStyle = "#00FF00";
ctx.moveTo(xo, yo);
ctx.lineTo(xo + y_axis.x * 1, yo + y_axis.y * 1);
ctx.stroke();

let zAxis = new Point3D(0, 0, -100);
let z_axis = camera.project(zAxis);
ctx.strokeStyle = "#0000FF";
ctx.moveTo(xo, yo);
ctx.lineTo(xo + z_axis.x * 1, yo + z_axis.y * 1);
ctx.stroke();

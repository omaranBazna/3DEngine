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
  }
}

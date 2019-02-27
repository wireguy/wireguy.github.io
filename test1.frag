#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float u_time;
uniform vec2 mouse;
uniform vec2 u_resolution;

#define STEP t += .5 * (length(mod((vec3(1.0, 0., u_time) + vec3(uv, 1.) * t) + 1., 2.) - 1.) - .5)
#define STEP_8 STEP; STEP; STEP; STEP; STEP; STEP; STEP; STEP
#define STEP_256 STEP_8; STEP_8; STEP_8; STEP_8; STEP_8; STEP_8; STEP_8; STEP_8

void main() { 

	vec2 uv = (2. * gl_FragCoord.xy - u_resolution) / u_resolution.y;
	vec3 col = vec3(0.0314, 0.0902, 0.2863);
	
	float c = cos(u_time / 10.);
	float s = sin(u_time / 10.);
	uv *= mat2(c, s, -s, c);
	
	
	float t = 0.;
	STEP_256;

	col += 1. / t;
	
	gl_FragColor = vec4(col, 1.);

}
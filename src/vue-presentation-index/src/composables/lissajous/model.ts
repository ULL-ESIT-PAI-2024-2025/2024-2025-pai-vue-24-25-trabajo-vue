/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería variableY Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Diego Antonio Pi Arteaga
 * @since Apr 5, 2025
 *        Defines the class Model.
 *              
 * @see {@link https://github.com/ULL-ESIT-PAI-2024-2025/2024-2025_P10_Events-Lissajous/blob/main/p10_Events-Lissajous.md#la-clase-lissajous}
 */

export class LissajousModel {
  private points: { variableX: number; variableY: number }[] = [];
  private animationSpeed: number = 0.01;

  /**
   * Constructor of the class
   * 
   * @param variableA - variable a of the Lissajous curve
   * @param variableB - variable b of the Lissajous curve
   * @param phi - phase of the Lissajous curve
   */
  constructor(private variableA: number, private variableB: number, private phi: number) {
    this.updatePoints();
  }

  /**
   * Generates the points of the Lissajous curve
   * 
   * @param resolution - number of points to generate
   */
  private updatePoints(resolution: number = 10000): void {
    this.points = [];
    for (let i = 0; i < resolution; i++) {
			const variableT = (i / resolution) * 2 * Math.PI;
			const variableX = Math.sin(this.variableA * variableT + this.phi);
			const variableY = Math.sin(this.variableB * variableT);
			this.points.push({ variableX, variableY });
    }
  }

  /**
   * Sets the parameters of the Lissajous curve
   * 
   * @param variableA - variable a of the Lissajous curve
   * @param variableB - variable b of the Lissajous curve
   * @param phi - phase of the Lissajous curve
   */
  public setParameters(variableA: number, variableB: number, phi: number): void {
		this.variableA = variableA;
		this.variableB = variableB;
		this.phi = phi;
		this.updatePoints();
  }

  /**
   * Sets the animation speed of the Lissajous curve
   */
  public animationValuesUpdate(): void {
    this.phi += this.animationSpeed;
    this.updatePoints();
  }

  /**
   * Getter of the Points of the Lissajous curve
   * 
   * @returns the points of the Lissajous curve
   */
  public getPoints(): {variableX: number, variableY: number}[] {
		return this.points;
  }
}
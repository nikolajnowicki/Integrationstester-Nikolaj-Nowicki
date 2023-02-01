/**
 * @jest-environment jsdom
 */

import { movieSort } from "../functions";
import { mockData } from "../services/__mocks__/movieservice";

describe("Tests for sorting movies", () => {
  let result = [...mockData].map((m) => m.Title);
  test("Should sort movie titles based on descending order", () => {
    // Arrange
    let data = mockData;
    result.sort();

    // Act
    movieSort(data, true);

    // Assert

    // expect(data[0].Title).toBe(result[0]);
    // expect(data[1].Title).toBe(result[1]);

    for (let i = 0; i < data.length; i++) {
      expect(data[i].Title).toBe(result[i]);
    }
  });

  test("Should sort movie titles based on descending order", () => {
    // Arrange
    let data = mockData;
    result.reverse();

    // Act
    movieSort(data, false);

    // Assert

    // expect(data[1].Title).toBe(result[1]);
    // expect(data[2].Title).toBe(result[2]);

    for (let i = 0; i < data.length; i++) {
      expect(data[i].Title).toBe(result[i]);
    }
  });
});

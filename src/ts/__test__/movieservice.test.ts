/**
 * @jest-environment jsdom
 */

import axios from "axios";
import { getData } from "../services/movieservice";
import { mockData } from "../services/__mocks__/movieservice";

jest.mock("axios", () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      if (url.endsWith("error")) {
        reject([]);
      } else {
        resolve({ data: { Search: mockData } });
      }
    });
  },
}));

test("should get data", async () => {
  // act
  let movies = await getData("test");

  //assert
  expect(movies.length).toBe(7);
  expect(mockData[0].Title).toBe("The Godfather");
});

test("should throw an error when getting data", async () => {
  //act
  let movies = await getData("error");

  //assert
  expect(movies.length).toBe(0);
});

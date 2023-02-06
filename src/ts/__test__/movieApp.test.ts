/**
 * @jest-environment jsdom
 */

import { IMovie } from "../models/Movie";
import * as movieApp from "../movieApp";
import { mockData } from "../services/__mocks__/movieservice";
import { getData } from "../services/movieservice";

beforeEach(() => {
  document.body.innerHTML = "";
});

jest.mock("../services/movieservice");

describe("Testing createHtml function", () => {
  test("should create html correctly", () => {
    //Arrange
    document.body.innerHTML = `
      <div id="movie-container"></div>
      `;
    let container = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;
    //Act
    movieApp.createHtml(mockData, container);
    //Assert
    let titleCheck = container.firstChild?.firstChild?.textContent;
    let check = document.getElementsByClassName("movie");
    expect(container.innerHTML).toContain("h3");
    expect(container.innerHTML).toContain("img");
    expect(check).toBeTruthy();
    expect(titleCheck).toContain("The Godfather");
  });
});

describe("Testing displayNoResult", () => {
  test("displayNoResult should generate and display noMessage", () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;

    let container = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    //Act
    movieApp.displayNoResult(container);

    let assert = container.firstChild?.textContent;

    //Assert
    expect(container.innerHTML).toContain("p");
    expect(assert).toBe("Inga sökresultat att visa");
  });
});

describe("tests for displayNoResult function", () => {
  test('should create paragraph with "no results" message', () => {
    // arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;

    let container = document.querySelector(
      "#movie-container"
    ) as HTMLDivElement;

    // act
    movieApp.displayNoResult(container);

    // assert
    let message = document.querySelector("#movie-container > p")?.innerHTML;

    expect(message).toBe("Inga sökresultat att visa");
  });
});

test("Should add event listener on form submit in app init", () => {
  // Arrange
  document.body.innerHTML = `
  <form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
  </form>
  <div id="movie-container"></div>`;
  const initSpy = jest
    .spyOn(movieApp, "handleSubmit")
    .mockReturnValue(Promise.resolve());
  movieApp.init();

  // Act
  document.getElementById("search")?.click();

  // Assert
  expect(initSpy).toHaveBeenCalled();
  expect(initSpy).toHaveBeenCalledTimes(1);
});

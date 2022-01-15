import { MoveDTO, MoveConstructorOptions } from "./MoveDTO";

test("Test creation of a move from stub", () => {
  const moveStub: MoveConstructorOptions = {
    name: "dummy move",
    url: "https://test.test"
  }

  const testMove = new MoveDTO(moveStub);

  expect(testMove.name).toBe("dummy move");
  expect(testMove.url).toBe("https://test.test");
});
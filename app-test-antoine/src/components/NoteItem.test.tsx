import { render, screen } from "@testing-library/react";
import NoteItem from "./NoteItem";
import { Action } from "../reducer/ratesReducer";

describe("NoteItem component", () => {
  it("should render NoteItem component correctly", () => {
    render(<NoteItem id={0} title={""} note={0} commentary={""} handleEdit={function (id: number): void {
      throw new Error("Function not implemented.");
    } } dispatch={function (value: Action): void {
      throw new Error("Function not implemented.");
    } } backgroundColor={""} />);
    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });
});
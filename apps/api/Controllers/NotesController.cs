using FullStack.Api.Data;
using FullStack.Api.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStack.Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class NotesController(DataContext context) : ControllerBase
  {
    private readonly DataContext _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
    {
      try
      {
        var notes = await _context.Notes.ToListAsync();
        return Ok(notes);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError,
            "Error getting the notes");
      }
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Note>> GetNote(int id)
    {
      try
      {
        var note = await _context.Notes.FindAsync(id);

        if (note == null) return NotFound();

        return Ok(note);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError,
            "Error getting the note record");
      }
    }

    [HttpPost]
    public async Task<ActionResult<Note>> AddNote([FromBody] Note note)
    {
      try
      {
        if (note == null)
          return BadRequest();

        var createdNote = await _context.Notes.AddAsync(note);
        return CreatedAtAction(nameof(GetNote),
                    new { id = createdNote.Entity.Id }, createdNote);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError,
            "Error creating new note record");
      }
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteNote(int id)
    {
      try
      {
        var note = await _context.Notes.FirstOrDefaultAsync(x => x.Id == id);

        if (note == null) return NotFound();
        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();

        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting the note record");
      }
    }

  }
}

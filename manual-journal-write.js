console.log('Starting manual journal write test...')
import sql from './db.js'

async function manualJournalWrite() {
  try {
    const testContent = 'Manual test journal entry at ' + new Date().toISOString()
    const result = await sql`
      INSERT INTO journals (content, timestamp) VALUES (${testContent}, NOW()) RETURNING *
    `
    console.log('✅ Successfully wrote to journals:', result[0])
  } catch (error) {
    console.error('❌ Failed to write to journals:', error.message)
    console.error(error)
  } finally {
    await sql.end()
  }
}

manualJournalWrite().catch(e => { console.error('Top-level error:', e) })
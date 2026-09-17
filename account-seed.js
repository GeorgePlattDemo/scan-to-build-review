/* Scan-to-Build front-door seed.
   Accounts are data. Pages render this. They do not invent a life in copy.
   Fixture only: declared demonstration records, not live commerce. */

window.STB_ACCOUNT_SEED = {
  version: 'front-door-accounts-0.1',
  accounts: {
    sarah: {
      id: 'sarah',
      name: 'Sarah',
      label: 'User 1',
      door: 'new-user',
      role: 'new',
      blurb: 'Clean bench. First walk. Nothing purchased, nothing saved.'
    },
    tom: {
      id: 'tom',
      name: 'Tom',
      label: 'Returning owner',
      door: 'returning',
      role: 'returning',
      blurb: 'Opened the alcove, changed it, purchased. That record is his.'
    },
    dick: {
      id: 'dick',
      name: 'Dick',
      label: 'Professional',
      door: 'professional',
      role: 'professional',
      blurb: 'Contractor bench: one saved, one in work, one sold.'
    },
    harry: {
      id: 'harry',
      name: 'Harry',
      label: 'Browser',
      door: 'new-user',
      role: 'browse',
      blurb: 'Saved the alcove. Did nothing else.'
    }
  },
  library: {
    alcove: { id: 'alcove', title: 'Critical fit · Shelf insert', rootId: 'alcove-capture' },
    windowSeat: { id: 'window-seat', title: 'Space utilization · Window seat', rootId: 'window-intake' },
    playhouse: { id: 'playhouse', title: 'Playhouse arched window', rootId: 'playhouse-s001' },
    picnic: { id: 'picnic', title: 'Outdoor build · Picnic table', rootId: 'picnic-chooser' },
    takeoff: { id: 'takeoff', title: 'Kitchen run · takeoff in', rootId: 'intake' }
  },
  projects: [
    {
      id: 'tom-alcove-001',
      accountId: 'tom',
      libraryId: 'alcove',
      title: 'Alcove insert · hall closet',
      status: 'purchased',
      list: 'archive',
      summary: 'Opened from the library. Changed shelf count and span. Sent to Store Zero. Purchased as a declared fixture — not a live charge.',
      events: [
        { type: 'opened', note: 'From Home library · Critical fit' },
        { type: 'revised', note: 'Shelf count and derived span changed' },
        { type: 'store_asked', note: 'Store Zero reference answer recorded' },
        { type: 'purchased', note: 'Declared purchase event. No payment processor.' }
      ]
    },
    {
      id: 'harry-alcove-001',
      accountId: 'harry',
      libraryId: 'alcove',
      title: 'Alcove insert · saved looking',
      status: 'saved',
      list: 'working',
      summary: 'Saved from the library. No revision. No Store send. No purchase.',
      events: [
        { type: 'saved', note: 'Affirmative save only. Idle after that.' }
      ]
    },
    {
      id: 'dick-draft-001',
      accountId: 'dick',
      libraryId: 'alcove',
      title: 'Mudroom cubbies · draft',
      status: 'saved',
      list: 'working',
      summary: 'Saved professional draft. Still his. Not sent.',
      events: [
        { type: 'saved', note: 'Draft on the contractor bench' }
      ]
    },
    {
      id: 'dick-work-001',
      accountId: 'dick',
      libraryId: 'window-seat',
      title: 'Window seat · 112 Maple',
      status: 'in_work',
      list: 'working',
      summary: 'Job in work. Definition frozen enough to keep asking Store. Not sold.',
      events: [
        { type: 'opened', note: 'From space-utilization library project' },
        { type: 'revised', note: 'Customer opening numbers entered' },
        { type: 'store_asked', note: 'Waiting on a later pass' }
      ]
    },
    {
      id: 'dick-sold-001',
      accountId: 'dick',
      libraryId: 'takeoff',
      title: 'Kitchen run · sold',
      status: 'sold',
      list: 'archive',
      summary: 'Sold job. Customer copy is parts and sizes only.',
      events: [
        { type: 'opened', note: 'Takeoff in' },
        { type: 'store_asked', note: 'Store Zero reference answer' },
        { type: 'sold', note: 'Declared sold. Customer record: parts and sizes.' }
      ]
    }
  ]
};

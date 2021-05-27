const corsOption = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'https://pikaff.ga',
    'https://www.pikaff.ga',
  ],
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  optionsSuccessStatus: 200,
  credentials: true,
}

export default corsOption

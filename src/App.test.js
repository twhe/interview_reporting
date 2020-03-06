import React from 'react';
import { render, fireEvent, waitForElement, wait } from '@testing-library/react';
import App from './App';
import { getAllInterviewEvents } from './Api/Api'

jest.mock('./Api/Api')

test('Renders page', async () => {
  getAllInterviewEvents.mockResolvedValue([])
  const { getByText } = render(<App />)
  await wait(() => document.querySelector('.leaflet-container'))
  expect(document.querySelector('.leaflet-container')).toBeInTheDocument()
})

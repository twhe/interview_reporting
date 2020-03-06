import React from 'react';
import { render, fireEvent, waitForElement, wait } from '@testing-library/react';
import App from './App';
import { getAllInterviewEvents } from './Api/Api'


const mockEvents = [{"userid":"123","type":"Settlement","lonlat":[-0.698567,52.305549],"nearestOffice":"Birmingham","created":"2020-03-06T11:58:47.520Z"},{"userid":"234","type":"Settlement","lonlat":[-1.932404,52.440099],"nearestOffice":"Birmingham","created":"2020-03-06T12:00:48.113Z"},{"userid":"324","type":"Settlement","lonlat":[-0.131017,51.487154],"nearestOffice":"Mayfair","created":"2020-03-06T12:01:10.948Z"},{"userid":"543","type":"Settlement","lonlat":[-2.291032,53.462559],"nearestOffice":"Manchester","created":"2020-03-06T13:02:13.983Z"}]


jest.mock('./Api/Api')

test('Renders page', async () => {
  getAllInterviewEvents.mockResolvedValue([])
  const { getByText } = render(<App />)
  await wait(() => document.querySelector('.leaflet-container'))
  expect(document.querySelector('.leaflet-container')).toBeInTheDocument()
})

test('Displays error message', async () => {
  getAllInterviewEvents.mockRejectedValue(new Error('API error'))
  const { getByText } = render(<App />)
  await wait(() => document.querySelector('.message'))
  expect(document.querySelector('.message')).toBeInTheDocument()
})

test('Renders four markers', async () => {
  getAllInterviewEvents.mockResolvedValue(mockEvents)
  const { getByText } = render(<App />)
  await wait(() => document.querySelector('.leaflet-marker-icon'))
  expect(document.querySelectorAll('.leaflet-marker-icon')).toHaveLength(4)
})

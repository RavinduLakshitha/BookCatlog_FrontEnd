import { Provider } from 'react-redux';
import { store } from './store';
import { BookCatalogPage } from './Pages/BookCatlogPage'

function App() {
  return (
    <Provider store={store}>
      <BookCatalogPage />
    </Provider>
  )
}

export default App

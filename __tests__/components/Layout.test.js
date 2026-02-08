import { render, screen } from '../helpers/render'
import Layout from '@/components/Layout'

describe('Layout Component', () => {
  test('renders children correctly', () => {
    render(
      <Layout>
        <div>Test Child Content</div>
      </Layout>
    )

    expect(screen.getByText('Test Child Content')).toBeInTheDocument()
  })

  test('renders Header component', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    )

    // Header component renders a header element with logo and links
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
  })

  test('renders multiple children', () => {
    render(
      <Layout>
        <div>First Child</div>
        <div>Second Child</div>
      </Layout>
    )

    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
  })
})

import { getCssText } from '@ignite-ui/react'

export const StyleSheet = () => {
  return (
    <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
  )
}

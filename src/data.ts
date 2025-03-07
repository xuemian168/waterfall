import daxing1 from '/images/daxing1.png'
import daxing2 from '/images/daxing2.png'
import tml1 from '/images/tml1.png'
import casino1 from '/images/casino1.png'
import goco2 from '/images/goco2.png'
import fenghuang1 from '/images/fenghuang1.png'
import fenghuang2 from '/images/fenghuang2.png'
import fenghuang3 from '/images/fenghuang3.png'
import hanggang from '/images/hanggang.png'
import donglai1 from '/images/donglai1.png'
import hubStation1 from '/images/hubStation1.png'
import rochedale from '/images/rochedale.png'
import wuxi1 from '/images/wuxi1.png'
import goco from '/images/goco.png'
import soho from '/images/soho.jpg'
import storybridge from '/images/storybridge.png'
import kingIsland from '/images/kingIsland.png'
import bne1 from '/images/bne1.png'
import jan241 from '/images/jan241.png'
import hgh1 from '/images/hgh1.png'
import hgh2 from '/images/hgh2.png'
import hgh3 from '/images/hgh3.jpg'
import hangzhoueast1 from '/images/hangzhoueast1.png'
import hh1 from '/images/hh1.png'
import hz5 from '/images/hz5.png'
import hz9 from '/images/hz9.png'
import hz365 from '/images/hz365.png'
import intersection from '/images/intersection.png'
import shanghai1 from '/images/shanghai1.png'
import shanghaitower from '/images/shanghaitower.png'
import bne254 from '/images/bne254.png'
import banshan1 from '/images/banshan1.png'
import sanche from '/images/sanche.png'

export interface Theme {
  title: string
  description: string
  coverImage: string
  gallery: string[]
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export const themes: Theme[] = [
  {
    title: "Urban Architecture",
    description: "Exploring the geometric patterns and stark contrasts of modern cityscapes, where light and shadow dance across steel and glass surfaces.",
    coverImage: soho,
    gallery: shuffleArray([
      daxing1,
      daxing2,
      tml1,
      casino1,
      goco2,
      fenghuang1,
      fenghuang2,
      fenghuang3,
      storybridge,
      bne1,
      hanggang,
      intersection,
      shanghai1,
      shanghaitower,
    ])
  },
  {
    title: "Public Transportation",
    description: "",
    coverImage: daxing1,
    gallery: shuffleArray([
      hubStation1,
      hgh1,
      hgh2,
      hgh3,
      hangzhoueast1,
      hz365,
      hz5,
      hz9,
      bne254,
      hh1,
      sanche,
      intersection,
    ])
  },
  {
    title: "Nature",
    description: "",
    coverImage: goco,
    gallery: shuffleArray([
      goco,
      donglai1,
      wuxi1,
      rochedale,
      jan241,
      kingIsland,
      banshan1,
    ])
  }
]
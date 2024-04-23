/**
 * Quran API read operations
 */

const QuranAPI = {
  chapters: {
    all: async (callback: (res: any) => void) =>
      await fetch('/api/chapters')
        .then((res) => res.json())
        .then((res) => callback(res.data))
        .catch((err) => console.log(err)),
    get: async (id: number, callback: (res: any) => void) =>
      await fetch(`/api/chapters/${id}`)
        .then((res) => res.json())
        .then((res) => callback(res.data))
        .catch((err) => console.log(err)),
    search: async (query: string, callback: (res: any) => void) =>
      await fetch(`/api/chapters?name=${query}`)
        .then((res) => res.json())
        .then((res) => callback(res.data))
        .catch((err) => console.log(err)),
  },
  verses: {
    all: async (chapterId: number, callback: (res: any) => void) =>
      await fetch(`/api/chapters/${chapterId}/verses`)
        .then((res) => res.json())
        .then((res) => callback(res.data))
        .catch((err) => console.log(err)),
    get: async (id: number, callback: (res: any) => void) =>
      await fetch(`/api/verses/${id}`)
        .then((res) => res.json())
        .then((res) => callback(res.data))
        .catch((err) => console.log(err)),
    search: async (query: string, callback: (res: any) => void) =>
      await fetch(`/api/verses?text=${query}`)
        .then((res) => res.json())
        .then((res) => callback(res.data))
        .catch((err) => console.log(err)),
    searchByChapter: async (chapterId: number, callback: (res: any) => void) =>
      await fetch(`/api/verses?chapter=${chapterId}`)
        .then((res) => res.json())
        .then((res) => callback(res.data))
        .catch((err) => console.log(err)),
    searchByChapterAndText: async (
      chapterId: number,
      text: string,
      callback: (res: any) => void,
    ) =>
      await fetch(`/api/verses?chapter=${chapterId}
        &text=${text}`)
        .then((res) => res.json())
        .then((res) => callback(res.data))
        .catch((err) => console.log(err)),
  },
}

export default QuranAPI

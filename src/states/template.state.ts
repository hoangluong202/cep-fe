import { create } from 'zustand';

export const useTemplateStore = create<TemplateStore>()((set) => ({
  visibleView: true,
  template: null,
  templates: [
    {
      id: '1',
      name: 'Giờ Trái Đất',
      color: '#f34523',
      lightSettings: [
        {
          startTime: '18:00',
          endTime: '22:00',
          dimming: 0
        }
      ]
    },
    {
      id: '2',
      name: 'Giải bóng đá toàn trường',
      color: '#163728',
      lightSettings: [
        {
          startTime: '17:00',
          endTime: '19:00',
          dimming: 80
        }
      ]
    }
  ],
  setVisibleView: (visibleView) => set({ visibleView }),
  setTemplate: (template) => set({ template }),
  setTemplates: (templates) => set({ templates })
}));

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
          startHour: 20,
          startMinute: 30,
          endHour: 21,
          endMinute: 30,
          dimming: 0
        }
      ]
    },
    {
      id: '2',
      name: 'Giải bóng đá toàn trường',
      color: '#b1a1a1',
      lightSettings: [
        {
          startHour: 17,
          startMinute: 30,
          endHour: 18,
          endMinute: 30,
          dimming: 80
        },
        {
          startHour: 18,
          startMinute: 30,
          endHour: 22,
          endMinute: 0,
          dimming: 90
        }
      ]
    }
  ],
  setVisibleView: (visibleView) => set({ visibleView }),
  setTemplate: (template) => set({ template }),
  setTemplates: (templates) => set({ templates })
}));

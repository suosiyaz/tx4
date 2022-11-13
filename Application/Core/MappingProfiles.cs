using Application.HotNewses;
using Application.WorkOrders;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<WorkOrder, WorkOrder>();
            CreateMap<WorkOrderCreateDto, WorkOrder>();
            CreateMap<WorkOrder, WorkOrderDto>()
                .ForMember(d => d.Aged, o => o.MapFrom(s => (s.CompletionDate != null && s.DateReleased != null) ? (int)(s.CompletionDate - s.DateReleased).Value.Days : 0 ))
                .ForMember(d => d.SLABreached, o => o.MapFrom(s => (s.CompletionDate != null && s.DateReleased != null) ? (int)(s.CompletionDate - s.DateReleased).Value.Days >= 10 ? true : false : false));

            CreateMap<HotNews, HotNewsDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.FirstName))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author.UserName));
        }
    }
}